

const ErrorMessageModal = ({error}) => {
  return (
    <>
    <div style={{
      color: 'red',
      textAlign: 'center',
      fontWeight: '600',
      letterSpacing: '1px',
      fontSize: '30px',
      marginBottom: '20px'
    }}>Error!</div>
    {error}
    </>
  );
}

export default ErrorMessageModal;