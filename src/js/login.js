import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

async function login(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;
    if (user) {
      console.log('Welcome,', user.email);
    }
    console.log('Logged in:', user);
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error('Login error:', error.code, error.message);
  }
}

export { login };
