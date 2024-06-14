import { useId } from 'react';
import { useForm } from 'react-hook-form';
import './register.css';

function Registration() {
    const idPrefix = useId();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleFormSubmit = (dati) => {
        console.log(dati);
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
            <h3>Registration Form</h3>
            <div className='form-field-container'>
                <label htmlFor={idPrefix + '-nome'}>Nome</label>
                <input
                    {...register('nome', { required: true })}
                    type='text'
                    id={idPrefix + '-nome'}
                    placeholder='Nome' />
                {errors.nome && <p>Name required</p>}
            </div>
            <div className='form-field-container'>
                <label htmlFor={idPrefix + '-email'}>Email</label>
                <input
                    {...register('email', {
                        required: true,
                        pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
                    })}
                    type='text'
                    id={idPrefix + '-email'}
                    placeholder='Email' />
                {errors.email && <p>Insert a valid email</p>}
            </div>
            <div className='form-field-container'>
                <label htmlFor={idPrefix + '-password'}>Password</label>
                <input
                    {...register('password', { required: true, minLength: 8, maxLength: 20 })}
                    type='password'
                    id={idPrefix + '-password'}
                    placeholder='Password' />
                {errors.password && <p>You need to type a pawssword between 8 and 20 characters</p>}
            </div>
            <div className='form-field-container'>
                <input
                    {...register('privacy', { required: true })}
                    type='checkbox' /> I have read and understood the privacy policy
                {errors.privacy && <p>It's necessary to accept the privacy policy</p>}
            </div>
            <div className='form-field-container'>
                <button type='submit'>Submit</button>
            </div>
        </form>
    );
};

export default Registration;