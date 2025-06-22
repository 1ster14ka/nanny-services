import {
  createUserWithEmailAndPassword,
  reload,
  updateProfile,
} from 'firebase/auth';
import { db, auth } from './firebase';
import { ref, set } from 'firebase/database';
import { updateUserUI } from './header';

async function register(name, email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log('Register', user);

    await set(ref(db, 'users/' + user.uid), {
      name,
      email,
      uid: user.uid,
    });
    await updateProfile(user, {
      displayName: name,
    });
    await user.reload();
    updateUserUI(user);
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error('Register error:', error.code, error.message);
  }
}

export { register };
