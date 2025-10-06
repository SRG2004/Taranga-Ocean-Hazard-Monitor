const { createClient } = require('@supabase/supabase-js');
require('dotenv').config(); // Load environment variables from a .env file

// Fetch Supabase credentials from environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Ensure the required environment variables are set
if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be defined in your environment variables.');
  process.exit(1); // Exit if credentials are not found
}

// Initialize the Supabase client for administrative tasks
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Define the users to be seeded
const users = [
    { email: 'admin@tarang.com', roles: ['admin'], password: 'password123' },
    { email: 'researcher@tarang.com', roles: ['researcher'], password: 'password123' },
    { email: 'government@tarang.com', roles: ['government'], password: 'password123' },
    { email: 'maritime@tarang.com', roles: ['maritime'], password: 'password123' },
    { email: 'public@tarang.com', roles: ['public'], password: 'password123' },
];

const seedDatabase = async () => {
  try {
    console.log('Starting to seed database...');

    for (const user of users) {
      // Step 1: Create the user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: user.email,
        password: user.password,
        email_confirm: true, // Automatically confirm the user's email
      });

      if (authError) {
        // If the user already exists, you can choose to skip it or handle it as an error
        if (authError.message.includes('already exists')) {
            console.warn(`Auth user ${user.email} already exists. Skipping creation.`);
            // Find the existing user to get their ID for profile insertion
            const { data: existingUser, error: findError } = await supabase.auth.admin.listUsers({ email: user.email });
            if(findError || !existingUser || existingUser.length === 0) {
                throw new Error(`Could not find existing user for email: ${user.email}`);
            }
            authData.user = existingUser[0];
        } else {
            throw new Error(`Error creating auth user ${user.email}: ${authError.message}`);
        }
      }
        
      const newUser = authData.user;
      console.log(`Successfully handled auth user: ${newUser.email} with ID: ${newUser.id}`);

      // Step 2: Insert user profile and roles into the 'profiles' table
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: newUser.id, // Link to the auth.users table
          email: user.email,
          roles: user.roles,
        }, { onConflict: 'id' }); // Use onConflict to avoid duplicates if re-running

      if (profileError) {
        // If profile insertion fails, it's good practice to clean up the created auth user
        await supabase.auth.admin.deleteUser(newUser.id);
        throw new Error(`Error inserting profile for ${user.email}: ${profileError.message}`);
      }

      console.log(`Successfully inserted profile for user: ${user.email}`);
    }

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
