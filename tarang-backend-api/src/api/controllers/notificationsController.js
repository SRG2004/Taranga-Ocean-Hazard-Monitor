
exports.sendNotification = async (req, res) => {
    const { message, recipients, severity } = req.body;
    // Mock implementation
    console.log(`Sending notification: "${message}" to ${recipients.length} recipients with severity ${severity}.`);
    res.status(200).send({ message: "Notification sent successfully." });
};

exports.getNotificationLogs = async (req, res) => {
    // Mock implementation
    const mockLogs = [
        {
            timestamp: '2025-09-29T12:00:00Z',
            message: 'High wave warning for the coast.',
            sentBy: 'admin',
            recipients: ['user1', 'user2'],
            severity: 'high'
        },
        {
            timestamp: '2025-09-28T18:00:00Z',
            message: 'Please verify the latest reports.',
            sentBy: 'admin',
            recipients: ['official1'],
            severity: 'medium'
        }
    ];
    res.status(200).send(mockLogs);
};
