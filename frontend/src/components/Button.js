import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { BsFillCaretRightFill } from "react-icons/bs";

function simulateNetworkRequest() {
  return new Promise((resolve) => setTimeout(resolve, 800));
}

function LoadingButton(props) {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);

  const handleClick = () => setLoading(true);

  return (
    <Button className='btn_run'
      variant="success"
      size="lg"
      disabled={isLoading}
      onClick={()=>{
        const fun1 = !isLoading ? handleClick : null;
        const fun2 = props.interpretar;
        fun1()
        fun2()
      }}
    >
      {isLoading ? 'Loading…' : 'Run'} <BsFillCaretRightFill/>
    </Button>
  );
}

export default LoadingButton;
