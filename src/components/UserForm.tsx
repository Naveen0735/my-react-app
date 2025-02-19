import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { useAppDispatch } from '../store';
import { saveFormData } from '../store';
import './UserForm.css';

interface UserFormProps {
  fields: string[];
  section: string;
  includeUserId?: boolean;
}

const UserForm: React.FC<UserFormProps> = ({ fields, section, includeUserId = false }) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [unsavedChanges, setUnsavedChanges] = useState<boolean>(false);
  const [userExists, setUserExists] = useState(false);
  const [existingUserId, setExistingUserId] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setUnsavedChanges(true);
    setUserExists(false);
    setMessage('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const localStorageKey = section === 'section1' ? 'formDataSection1' : 'formDataSection2';
    const storedData = localStorage.getItem(localStorageKey);

    if (section === 'section1') {
      const nameVal = formData.name?.trim();
      const jsonVal = formData.user_data_json_object?.trim();
      if (!nameVal && !jsonVal) {
        setMessage('Invalid data');
        return;
      }
      if (storedData && nameVal && jsonVal) {
        const parsedData = JSON.parse(storedData);
        if (
          parsedData.name === formData.name &&
          parsedData.user_data_json_object === formData.user_data_json_object
        ) {
          setUserExists(true);
          setExistingUserId(parsedData.id);
          setFormData(prev => ({ ...prev, id: parsedData.id }));
          setMessage(`User already exists with user id - ${parsedData.id}. Check dashboard`);
          setUnsavedChanges(false);
          console.log('Duplicate data. Existing data retrieved:', parsedData);
          return;
        }
      }
    }


    if (section === 'section2') {
      const addressVal = formData.address?.trim();
      const emailVal = formData.email?.trim();
      const phoneVal = formData.phone?.trim();
      if (!addressVal && !emailVal && !phoneVal) {
        setMessage('Invalid data');
        return;
      }
    }

    // Save new data if validations pass
    const uniqueId = `user-${Date.now()}`;
    const updatedData = { ...formData, id: uniqueId };
    dispatch(saveFormData(updatedData));
    localStorage.setItem(localStorageKey, JSON.stringify(updatedData));
    window.dispatchEvent(new Event('localStorageUpdated'));
    setFormData(updatedData);
    setUserExists(false);
    setExistingUserId('');
    setMessage('Successfully saved, check dashboard');
    setUnsavedChanges(false);
    console.log('Saved data:', updatedData);
  };

  // Warn user of unsaved changes before unloading
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (unsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [unsavedChanges]);

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      {fields.map(field => {
        const fieldName = field.toLowerCase().replace(/\s+/g, '_');
        const placeholder =
          field.toLowerCase() === 'user data json object'
            ? 'Enter user data ( ex. role )'
            : `Enter your ${field}`;
        return (
          <TextField
            key={field}
            name={fieldName}
            placeholder={placeholder}
            value={formData[fieldName] || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputProps={{ 'aria-label': field }}
          />
        );
      })}
      {includeUserId && (
        <TextField
          name="id"
          placeholder="user id"
          value={formData.id || existingUserId || ''}
          InputProps={{
            readOnly: true,
            'aria-label': 'User ID',
          }}
          fullWidth
          margin="normal"
          variant="outlined"
        />
      )}
      <Button variant="contained" color="primary" type="submit">
        Save
      </Button>
      {message && (
        <Typography variant="body2" color={userExists ? 'error' : 'primary'}>
          {message}
        </Typography>
      )}
    </form>
  );
};

export default UserForm;
