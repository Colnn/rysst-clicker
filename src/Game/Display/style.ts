import { makeStyles } from '@mui/styles';

export default makeStyles(() => {
  return {
    container: {
      width: '100%',
      height: '100%',
      background:
        '#b4b4b4 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAAD1BMVEUAAAC0trSsrqy0srSsqqwXP+u3AAAAAXRSTlMAQObYZgAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAphJREFUOI0VVNkVxCAIpAXABgAb4GhA3f5r2slX8hRhLqXI+VX8rJ9XLudc2u1uZK4sbLZdNZhP+dGKazTaw+mWxqfzjvth1pvEGvYcRS+ltrIOBxowpVqp7bQnmTUWHZ4oJAmvkTauFHf12GtQ8SiWYqnMW3glq02YWzmVh+5SNv6mTauYO3vSkcR/62h1c0lv7xq9ZB1huoJbdlfXtiWd0fSA0DaXSWzPvKWdfnpTWS/Mxu7FzLMNCBPdKHEezKVEwiwwuqQ8m6KSxWVngtx4QkLxJY8+mVLE8h7vKG9MvDZOEYdXYWh2oKCOtGTUJuZQoNsg8Uoh0pzzgwx0biTkTzbhfLVCI00jqGZXTQhab1PvOSLLQygkMoHFUOjgEJfhaTJ92viLetK+HGTiQbZjBKtPqCw4r/yBcKjAqqSSm7OtfjVu3/pGP2GS+jmUL/YK8XpL8QlZZGay2i/ODWA0dwmsubRT5zPfYT4+KprW+SCi4oStmof4BQwA+0QlAabBJeFyhrOJPr4DfgAKIrUyI4D2V375DYJEX54K1KM9Wn3lwnFdYN5wgKG0B79X3JNQp4KUF/NNQG2s7Okc/wQAqoBqX0YBaTacjZgsI+5+XZ8HGrsaUchGGg61gmstyacPhyRGXsQVUt89ZWEXWd4eUVx8YBT6KJbF74NxenBpRJqd3jOxKgQmz/5hKuiDStOFQaA+x86CNJ+7iPYrWoVoIoyB+GERV8aAVgTM0aNPPuzuBdjgPc+KFDd0UuGS2P7IoF3odWpAiL41K3F9UYPoCKMV1C0IlFyofRkK1ZB5QxKrchhZVhRr1edhbIZWB48CJ6RtCNLQB6ErJaiHf/85f88J7EoOvB9BAu8Z16X5WHg3rsnF29R/suGoWIoIshkAAAAASUVORK5CYII=)',
    },
    topContainer: {
      width: '100%',
    },
    options: {
      width: '10%',
      backgroundImage: 'url("/options.png")',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      imageRendering: 'pixelated',
    },
    statsHeader: {
      width: '100%',
      height: '40px',
      display: 'flex',
      justifyContent: 'start',
      padding: '0px 10px',
      margin: '10px',
      alignItems: 'center',
    },
    upgradeContainer: {
      width: '75px',
      height: '75px',
      margin: '5px',
    },
    icon: {
      width: '100%',
      imageRendering: 'pixelated',
    },
    innerContainer: {
      width: '100%',
      height: '100%',
    },
    importantButton: {
      color: 'white',
      width: '80px',
      textAlign: 'center',
      marginTop: '5px',
      marginLeft: '10px',
    },
    greenButton: {
      backgroundColor: '#27d41e',
    },
    redButton: {
      backgroundColor: '#d4241e',
    },
  };
});
