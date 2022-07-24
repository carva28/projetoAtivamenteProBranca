const SkypeScript = (callback) => {
    const existingScript = document.getElementById('googleMaps');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://secure.skypeassets.com/i/scom/js/skype-uri.js';
      script.id = 'skypeCalls';
      document.body.appendChild(script);
      script.onload = () => { 
          if (callback) { callback() }else{console.log("error------ SKype")};
      };
    }
    if (existingScript && callback) callback();
  };
  export default SkypeScript;