import { TextField } from "@mui/material"

type Props = {
    name: string;
    type: string;
    label: string;
}

const CustomizedInput = (props: Props) => {
  return (
    <TextField margin="normal" 
      slotProps={{
        inputLabel: {
          style: { color: 'white' }
        },
        input: {
          style: { 
            fontSize: '16px',  // Adjust the font size as needed
            color: 'white'     // Optional: if you want white text input
          },
          inputProps: {style: {width:"500px" , borderRadius:"15px",fontSize:"20px",color:"white"}} // Optional: if you want white text input
        }
      }}
      name={props.name} 
      type={props.type} 
      label={props.label} 
    />
  )
}

export default CustomizedInput