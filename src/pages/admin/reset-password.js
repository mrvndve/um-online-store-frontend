import React, { 
  Fragment,
} from 'react';

import { useNavigate } from 'react-router';

import {
  Card,
  Button,
  WebViewContainer,
  MobileViewContainer,
  Password,
} from '../../components';

import useResetPassword from '../../hooks/use-admin-reset-password';

import '../../../src/App.css';

import { isEmpty } from 'lodash';

import { CheckCircle } from '@mui/icons-material';

const ResponsiveWrapper = ({
  children
}) => {
  return <>
    <Fragment>
      <WebViewContainer>
        <div className='login-page-container d-flex align-items-center justify-content-center h-100 p-4'>
          <Card elevation={5} padding={30} style={{ width: '35%' }}>
            {children}
          </Card>
        </div>
      </WebViewContainer>

      <MobileViewContainer>
        <div className='d-flex align-items-center justify-content-center h-100 p-3'>
          <Card elevation={5} padding={30}>
            {children}
          </Card>
        </div>
      </MobileViewContainer>
    </Fragment>
  </>
};

const Form = () => {
  const {
    register,
    fieldErrors,
    onSubmit,
    handleSubmit,
    apiValidationError,
    isReset,
  } = useResetPassword();

  const navigate = useNavigate();

  return <>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='row gy-4 gx-0' align='center'>
        {isReset &&
          <div>
            <CheckCircle style={{ fontSize: 80, color: 'green' }}/>
          </div>
        }

        <div className='col-12'>
          <h4>
            <strong>
              { !isReset ? 'Reset Password' : 'Password Changed'}
            </strong>
          </h4>
        </div>
        
        {!isReset
          ?
          <>
            {!isEmpty(apiValidationError) && apiValidationError.map(err => (
              <div className='col-12'>
                <span className='input-error-message'>
                  {`*${err[Object.keys(err)]}.`}
                </span>
              </div>
            ))}

            <div className='col-12'>
              <Password
                name='newPassword'
                label='New Password'
                {...register('newPassword', { 
                  required: 'New password field is required.', 
                })}
                errors={fieldErrors}
              />
            </div>

            <div className='col-12'>
              <Password
                name='confirmPassword'
                label='Confirm Password'
                {...register('confirmPassword', {
                  required: 'Password field is required.', 
                })}
                errors={fieldErrors}
              />
            </div>

            <div className='col-12'>
              <Button
                style={{  width: '100%' }}
                type='submit'
                label='Submit'
              />
            </div>
          </>
          :
          <>
            <div className='col-12 mb-4'>
              <span style={{ fontSize: 20}}>
                Your password has been changed, please go back to login page to sign in your account.
              </span>
            </div>

            <div className='col-12'>
              <div className='row g-0'>
                <div className='col-12' align='right'>
                  <span 
                    role='button'
                    style={{ textDecoration: 'underline', fontWeight: 'bold' }}
                    onClick={() => navigate('/admin/login')}
                  >
                    Go to login
                  </span>
                </div>
              </div>
            </div>
          </>
        }
      </div>
    </form>
  </>
};

const AdminResetPasswordPage = () => {
  return <>
    <ResponsiveWrapper>
      <Form/>
    </ResponsiveWrapper>
  </>
};

export default AdminResetPasswordPage;