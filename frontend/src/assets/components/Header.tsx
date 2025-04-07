import { AppBar, Toolbar } from '@mui/material';
import Logo from './shared/Logo';
import { useAuth } from '../../context/AuthContext';
import NavigationLinks from './shared/NavigationLinks';

const Header = () => {
  const auth = useAuth();
  return (
    <AppBar sx={{ 
      bgcolor: '#2A0E55',// Modern deep purple 
      position: 'static', 
      boxShadow: 'none',
      padding: '8px 16px',
      borderRadius:'10px',  // Adds spacing for better appearance
    }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Logo />
        <div style={{ display: 'flex', gap: '10px' }}>
          {auth?.isLoggedIn ? (
            <>
              <NavigationLinks 
                bg='#22D3EE' // Cyan for CTA
                to='/Chat' 
                text='Go to Chat' 
                textColor='white' 
              />
              <NavigationLinks 
                bg='#9333EA'  // Vibrant violet for logout
                textColor='white' 
                to='/' 
                text='Logout' 
                onClick={auth.logout} 
              />
            </>
          ) : (
            <>
              <NavigationLinks 
                bg='#22D3EE' 
                to='/Login' 
                text='Login' 
                textColor='white' 
              />
              <NavigationLinks 
                bg='#9333EA' 
                textColor='white' 
                to='/Signup' 
                text='Signup' 
              />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
