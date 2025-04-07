import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

const Logo = () => {
    return (
        <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginRight: 'auto', 
            gap: '10px'  
        }}>
            <Link to={'/'}>
                <img 
                    src="KalpaGen.png" 
                    alt="KalpaGen" 
                    style={{ 
                        width: '60px', 
                        height: '60px', 
                        objectFit: 'cover',  // Ensures the image fills the space correctly
                        borderRadius: '50%', // Makes the image round
                        border: '2px solid white' // Optional: Adds a border for better visibility
                    }} 
                />
            </Link>
            <Typography sx={{ 
                display: { md: "block", sm: 'none', xs: 'none' }, 
                fontWeight: 'bold', 
                textShadow: '1px 1px 10px rgba(0,0,0,0.2)', 
                color: '#F1F5F9'  
            }}>
                <span style={{ fontSize: '22px' }}>KalpaGen</span>
            </Typography>
        </div>
    );
}

export default Logo;
