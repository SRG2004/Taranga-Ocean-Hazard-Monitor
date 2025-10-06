const supabase = require('../../config/supabase');

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('*');

        if (error) {
            throw error;
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};


// Get a single user by ID
exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            throw error;
        }

        if (!data) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error getting user', error: error.message });
    }
};

// Update a user's profile
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, username, profile_picture_url, bio } = req.body;

        // The user ID should be the one from the authenticated session
        const authUserId = req.user.id; 

        // Ensure users can only update their own profile
        if (authUserId !== id) {
            return res.status(403).json({ message: 'Forbidden: You can only update your own profile.' });
        }

        const { data, error } = await supabase
            .from('profiles')
            .update({
                name,
                username,
                profile_picture_url,
                bio
            })
            .eq('id', id)
            .select();

        if (error) {
            throw error;
        }

        if (!data || data.length === 0) {
            return res.status(404).json({ message: 'User not found or no changes made.' });
        }

        res.status(200).json({ message: 'User updated successfully', user: data[0] });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // The user ID should be from an admin-authenticated session
        // For this example, we'll assume the request is authorized
        
        const { error: profileError } = await supabase
            .from('profiles')
            .delete()
            .eq('id', id);

        if (profileError) {
            throw new Error(`Error deleting profile: ${profileError.message}`);
        }
        
        // Now delete the user from auth.users
        const { error: authError } = await supabase.auth.admin.deleteUser(id);

        if (authError) {
             throw new Error(`Error deleting auth user: ${authError.message}`);
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
};
