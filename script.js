// Theme logic
const themeBtn = document.getElementById('tema');
const body = document.body;
const savedTheme = localStorage.getItem('Theme');

if (savedTheme==='dark'){
    body.classList.add('dark')
} else if (savedTheme=='light'){
    body.classList.add('light')
} else {
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (systemPrefersDark) {
        body.classList.add('dark');
    }else{
        body.classList.add('light');
    }
}

themeBtn.addEventListener('click', () => {
    if (body.classList.contains('dark')) {
      body.classList.remove('dark');
      body.classList.add('light');
      localStorage.setItem('theme', 'light');
    } else {
      body.classList.remove('light');
      body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  });

  // Language Logic

  