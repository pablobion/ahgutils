import Menu from '../../components/menu';


function MyApp({ Component, pageProps }) {




  return (
    <Menu>
      <div className='page' >

        <Component {...pageProps} />

      </div>
    </Menu>
  );
}

export default MyApp;
