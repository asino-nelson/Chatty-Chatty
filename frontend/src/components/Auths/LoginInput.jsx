import PropTypes from 'prop-types';

const LoginInput = ({ placeholder, type, name }) => {
  return (
    <div className=" flex flex-col mb-5">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="rounded-md p-2 outline-none text-black"
      />
    </div>
  );

 
};

LoginInput.propTypes = {
  placeholder: PropTypes.string.isRequired, 
  type: PropTypes.string.isRequired,        
  name: PropTypes.string.isRequired,      
};

export default LoginInput;

