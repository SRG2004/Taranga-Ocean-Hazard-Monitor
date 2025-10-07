const { supabase } = require('../../config/supabase');

// Get all hazards
exports.getAllHazards = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('hazards')
      .select('*');

    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hazards', error: error.message });
  }
};

// Report a hazard
exports.reportHazard = async (req, res) => {
  try {
    const { type, location, description, severity } = req.body;
    const userId = req.user.id; // Assuming auth middleware sets req.user

    const { data, error } = await supabase
      .from('hazards')
      .insert({
        type,
        location,
        description,
        severity,
        reported_by: userId,
        status: 'pending'
      })
      .select();

    if (error) throw error;
    res.status(201).json({ message: 'Hazard reported successfully', hazard: data[0] });
  } catch (error) {
    res.status(500).json({ message: 'Error reporting hazard', error: error.message });
  }
};

// Update hazard status
exports.updateHazardStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const { data, error } = await supabase
      .from('hazards')
      .update({ status })
      .eq('id', id)
      .select();

    if (error) throw error;
    res.status(200).json({ message: 'Hazard status updated', hazard: data[0] });
  } catch (error) {
    res.status(500).json({ message: 'Error updating hazard', error: error.message });
  }
};
