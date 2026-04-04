fetch('https://generativelanguage.googleapis.com/v1beta/models?key=AIzaSyD2sr16xAUodzaI53YSZfBKuViETE3-fCE').then(r=>r.text()).then(t => {
   require('fs').writeFileSync('gemini_test.txt', t);
});
