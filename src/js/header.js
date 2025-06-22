import { register } from './register';
import { login } from './login';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { logout } from './logout';

const backdrop = document.querySelector('.backdrop');
const btnRegistr = document.querySelector('.btn-register');
const btnLogout = document.querySelector('.btn-logout');
// const btnLogin = document.querySelector('.btn-login');
const list = document.querySelector('.registration');
const listUser = document.querySelector('.out');
const registr = document.querySelector('.registr');
const loginForm = document.querySelector('.login');
const btnEye = document.querySelectorAll('.toggle-password');
// const inputPassword = document.querySelector('.input-password');
const formLogin = document.querySelector('.form-login');
const formRegister = document.querySelector('.form-register');
const userName = document.querySelector('.userName');
document.querySelectorAll('.btn-close-modal').forEach(btn => {
  btn.addEventListener('click', () => {
    closeModal();
    // const type = e.currentTarget.dataset.type;
    // backdrop.classList.remove('is-open');
    // if (type === 'register') {
    //   registr.style.display = 'none';
    // } else {
    //   login.style.display = 'none';
    // }
  });
});

list.addEventListener('click', openModal);

function openModal(e) {
  if (e.target === btnRegistr) {
    registr.style.display = 'block';
  } else {
    loginForm.style.display = 'block';
  }
  backdrop.classList.add('is-open');
}

backdrop.addEventListener('click', e => {
  if (e.target === backdrop) {
    closeModal();
  }
});

function closeModal() {
  backdrop.classList.remove('is-open');
  // registr.style.display = 'none';
  // login.style.display = 'none';

  setTimeout(() => {
    // console.log('Hello');

    registr.style.display = 'none';
    loginForm.style.display = 'none';
  }, 200);
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && backdrop.classList.contains('is-open')) {
    closeModal();
  }
});

// btnEye.addEventListener('click', e => {
//   const isPassword = inputPassword.type === 'password';
//   inputPassword.type = isPassword ? 'text' : 'password';
//   btnEye.classList.toggle('active');
// });

btnEye.forEach(btn => {
  btn.addEventListener('click', () => {
    const inputPassword = btn
      .closest('.password-wrapper')
      .querySelector('.input-password');
    const isPassword = inputPassword.type === 'password';
    inputPassword.type = isPassword ? 'text' : 'password';
    btn.classList.toggle('active');
  });
});

formRegister.addEventListener('submit', handleRegister);

function handleRegister(e) {
  e.preventDefault();
  const name = e.target.elements.userName.value;
  const email = e.target.elements.email.value;
  const password = e.target.elements.password.value;

  register(name, email, password);

  // console.log('Login');

  e.currentTarget.reset();
}

formLogin.addEventListener('submit', handleLogin);

function handleLogin(e) {
  e.preventDefault();
  const email = e.target.elements.email.value;
  const password = e.target.elements.password.value;
  login(email, password);
  e.currentTarget.reset();
}

onAuthStateChanged(auth, user => {
  if (user) {
    console.log('👤 Текущий пользователь:', user.displayName);
    updateUserUI(user);
  } else {
    listUser.style.display = 'none';
    list.style.display = 'flex';

    console.log('🔒 Пользователь вышел');
  }
});

btnLogout.addEventListener('click', handleClick);

function handleClick() {
  logout();
}

function updateUserUI(user) {
  if (!user) return;

  userName.textContent = user.displayName || 'Anonim';
  listUser.style.display = 'flex';
  list.style.display = 'none';
}

export { updateUserUI };
