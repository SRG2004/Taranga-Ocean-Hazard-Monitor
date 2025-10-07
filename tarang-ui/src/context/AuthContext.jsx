
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        if (error) {
          console.error('Error fetching profile:', error);
          setCurrentUser(session.user);
        } else {
          setCurrentUser({ ...session.user, ...profile });
        }
      }
      setLoading(false);
    };
    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const user = session?.user;
        if (user) {
          let { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

          if (error && error.code === 'PGRST116') { // Profile not found
            // Create profile from user metadata
            const userData = user.user_metadata;
            const { data: newProfile, error: insertError } = await supabase
              .from('profiles')
              .insert({
                id: user.id,
                email: user.email,
                firstName: userData.firstName || '',
                lastName: userData.lastName || '',
                phone: userData.phone || '',
                country: userData.country || '',
                roles: userData.roles || ['citizen']
              })
              .select()
              .single();

            if (insertError) {
              console.error('Error creating profile:', insertError);
              setCurrentUser(user);
            } else {
              profile = newProfile;
              setCurrentUser({ ...user, ...profile });
            }
          } else if (error) {
            console.error('Error fetching profile:', error);
            setCurrentUser(user);
          } else {
            setCurrentUser({ ...user, ...profile });
          }
        } else {
          setCurrentUser(null);
        }
        setLoading(false);
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    signUp: async (email, password, userData) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: userData
            }
        });

        if (error) {
            return { data, error };
        }

        // Profile will be created automatically by the database trigger
        // Sign in immediately since email confirmation is disabled
        return supabase.auth.signInWithPassword({ email, password });
    },
    signIn: (email, password) => supabase.auth.signInWithPassword({ email, password }),
    signOut: () => supabase.auth.signOut(),
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
