function Button({ dispatch, type, btnText }) {
  return (
    <button className="btn btn-ui" onClick={() => dispatch({ type: type })}>
      {btnText}
    </button>
  );
}

export default Button;
