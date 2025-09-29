const db = require('../../db');
const { admin } = require('../../config/firebase');
const { v4: uuidv4 } = require('uuid');

exports.createReport = async (req, res) => {
    const user_id = req.user.id;
    const { hazardType, description, mediaUrls, location, timestamp, language } = req.body;

    if (!hazardType || !location || !timestamp) {
        return res.status(400).send({ error: 'Missing required report fields.' });
    }

    const newReport = {
        id: uuidv4(),
        user_id,
        hazard_type: hazardType,
        description,
        media_urls: mediaUrls,
        location: db.raw('ST_SetSRID(ST_MakePoint(?, ?), 4326)', [location.lng, location.lat]),
        created_at: timestamp,
        language
    };

    try {
        const [insertedReport] = await db('reports').insert(newReport).returning('*');

        const realtimeDb = admin.database();
        const feedRef = realtimeDb.ref('realtime/reports_feed').push();
        await feedRef.set({ id: insertedReport.id, hazardType: insertedReport.hazard_type, location, timestamp });

        res.status(201).send({ reportId: insertedReport.id, status: insertedReport.status, syncStatus: 'synced' });
    } catch (error) {
        console.error('Error creating report:', error);
        res.status(500).send({ error: 'Failed to create report.' });
    }
};

exports.getReports = async (req, res) => {
    const { status, bbox, from, to, hazard, verified } = req.query;
    try {
        const query = db('reports').select('*', db.raw('ST_AsGeoJSON(location) as location'));

        if (status) {
            query.where({ status });
        }

        if (bbox) {
            const [minLng, minLat, maxLng, maxLat] = bbox.split(',').map(parseFloat);
            query.whereRaw('ST_Intersects(location, ST_MakeEnvelope(?, ?, ?, ?, 4326))', [minLng, minLat, maxLng, maxLat]);
        }

        if (from) {
            query.where('created_at', '>=', from);
        }

        if (to) {
            query.where('created_at', '<=', to);
        }

        if (hazard) {
            query.where({ hazard_type: hazard });
        }

        if (verified) {
            if (verified === 'true') {
                query.whereNotNull('verified_by');
            } else if (verified === 'false') {
                query.whereNull('verified_by');
            }
        }


        const reports = await query;
        res.status(200).send(reports);
    } catch (error) {
        console.error('Error fetching reports:', error);
        res.status(500).send({ error: 'Failed to fetch reports.' });
    }
};

exports.updateReportStatus = async (req, res) => {
    const { id } = req.params;
    const { status, notes } = req.body;
    const verified_by = req.user.id;

    if (!status) {
        return res.status(400).send({ error: 'Status is required.' });
    }

    try {
        const [updatedReport] = await db('reports')
            .where({ id })
            .update({ 
                status, 
                notes, 
                verified_by,
                updated_at: db.fn.now()
            })
            .returning('*');

        if (!updatedReport) {
            return res.status(404).send({ error: 'Report not found.' });
        }

        const realtimeDb = admin.database();
        const feedRef = realtimeDb.ref(`realtime/reports_updates/${id}`);
        await feedRef.set({ id, status, verified_by, notes });

        res.status(200).send(updatedReport);
    } catch (error) {
        console.error('Error updating report:', error);
        res.status(500).send({ error: 'Failed to update report.' });
    }
};

exports.getReportById = async (req, res) => {
    const { id } = req.params;
    try {
        const report = await db('reports').where({ id }).select('*', db.raw('ST_AsGeoJSON(location) as location')).first();
        if (!report) {
            return res.status(404).send({ error: 'Report not found.' });
        }
        res.status(200).send(report);
    } catch (error) {
        console.error('Error fetching report:', error);
        res.status(500).send({ error: 'Failed to fetch report.' });
    }
};