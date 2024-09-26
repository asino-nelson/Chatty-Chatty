import PropTypes from 'prop-types';

const RegisterInput = ({placeholder, type, name, onchange}) => {
  return (
    <div className=" flex flex-col mb-5">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="rounded-md p-2 outline-none text-black"
        onChange={onchange}
      />
    </div>
  )
}

RegisterInput.propTypes = {
    placeholder: PropTypes.string.isRequired, 
    type: PropTypes.string.isRequired,        
    name: PropTypes.string.isRequired, 
    onchange: PropTypes.func.isRequired,      
  };

export default RegisterInput
