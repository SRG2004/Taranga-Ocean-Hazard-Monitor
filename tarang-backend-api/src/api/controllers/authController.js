const { supabase } = require('../../config/supabase'); // Assuming you create a supabase config file

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    res.status(200).send({ user: data.user, session: data.session });
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
};

exports.register = async (req, res) => {
  const { email, password, ...otherData } = req.body;

  try {
    const { data, error } = await supabase.auth.signUp(
      { email, password },
      { data: otherData } // You can pass additional user metadata here
    );
    if (error) throw error;
    res.status(201).send({ user: data.user });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.verifyToken = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).send({ error: 'Access token is required.' });
  }

  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error) throw error;
    res.status(200).send({ user });
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
};
