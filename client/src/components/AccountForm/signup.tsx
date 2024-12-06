import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import stylesheet
import Auth from '../../utils/auth';
import { login } from '../../utils/API';
import { useMutation } from '@apollo/react-hooks';

interface SignUpFormData {
    name: string;
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
}

const SignUp: React.FC = () => {
    const [formData, setFormData] = useState<SignUpFormData>({
        name: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    // error state
    const [error, setError] = useState<string | null>(null);

    // handle form input changes
}