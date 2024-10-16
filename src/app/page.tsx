
"use client"
import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { ref, set, onValue } from 'firebase/database';
import {
  Button,
  TextField,
  Typography,
  CircularProgress,
  Snackbar
} from '@mui/material';

const App = () => {
  // State variables
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [notification, setNotification] = useState('');

  // Load draft data from localStorage
  useEffect(() => {
    const draft = JSON.parse(localStorage.getItem('userDraft'));
    if (draft) {
      setFullName(draft.fullName);
      setEmail(draft.email);
      setPassword(draft.password);
      setConfirmPassword(draft.confirmPassword);
    }
  }, []);

  // Listen for new user notifications
  useEffect(() => {
    const usersRef = ref(db, 'users/');
    onValue(usersRef, (snapshot) => {
      if (snapshot.exists()) {
        setNotification('A new notification received');
      }
    });
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    // Validate form
    if (!fullName || !/^[A-Za-z\s]+$/.test(fullName)) {
      setErrorMessage('Full Name is required and should be alphabetic.');
      setLoading(false);
      return;
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage('Email is required and must be valid.');
      setLoading(false);
      return;
    }
    if (password.length < 8 || !/\d/.test(password) || !/[!@#$%^&*]/.test(password)) {
      setErrorMessage('Password must be at least 8 characters, include letters, numbers, and special characters.');
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      setLoading(false);
      return;
    }

    // Save data to Firebase
    try {
      const userId = new Date().getTime().toString(); // Unique ID for user
      await set(ref(db, 'users/' + userId), {
        fullName,
        email,
        password, // Note: In a real application, never store plaintext passwords
        createdAt: new Date().toISOString(),
      });
      setSuccess(true);
      // Clear form and localStorage
      setFullName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      localStorage.removeItem('userDraft');
    } catch (error) {
      setErrorMessage('Failed to submit the form: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Save draft to localStorage
  useEffect(() => {
    const draft = { fullName, email, password, confirmPassword };
    localStorage.setItem('userDraft', JSON.stringify(draft));
  }, [fullName, email, password, confirmPassword]);

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>Registration Form</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Full Name"
          variant="outlined"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          fullWidth
          required
          error={!!errorMessage && fullName && !/^[A-Za-z\s]+$/.test(fullName)}
          helperText={errorMessage && !/^[A-Za-z\s]+$/.test(fullName) ? errorMessage : ''}
        />
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
          error={!!errorMessage && email && !/\S+@\S+\.\S+/.test(email)}
          helperText={errorMessage && !/\S+@\S+\.\S+/.test(email) ? errorMessage : ''}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
          error={!!errorMessage && password.length < 8}
          helperText={errorMessage && password.length < 8 ? errorMessage : ''}
        />
        <TextField
          label="Confirm Password"
          variant="outlined"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          fullWidth
          required
          error={!!errorMessage && confirmPassword !== password}
          helperText={errorMessage && confirmPassword !== password ? errorMessage : ''}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          style={{ marginTop: '20px' }}
        >
          {loading ? <CircularProgress size={24} /> : 'Submit'}
        </Button>
      </form>
      <Snackbar
        open={success}
        onClose={() => setSuccess(false)}
        message="Form submitted successfully!"
        autoHideDuration={3000}
      />
      <Snackbar
        open={!!errorMessage}
        onClose={() => setErrorMessage('')}
        message={errorMessage}
        autoHideDuration={3000}
      />
      <Snackbar
        open={!!notification}
        onClose={() => setNotification('')}
        message={notification}
        autoHideDuration={3000}
      />
    </div>
  );
};

export default App;
