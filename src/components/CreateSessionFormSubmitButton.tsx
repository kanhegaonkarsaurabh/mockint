import { Button } from '@chakra-ui/core';
import * as React from 'react';

type SubmitBtnProps = {
  isLoadingCond: boolean;
  btnText: string;
};

const CreateSessionSubmitFormButton: React.FC<SubmitBtnProps> = ({
  isLoadingCond,
  btnText,
}: SubmitBtnProps) => {
  return (
    <Button type="submit" mt={4}>
      {btnText}
    </Button>
  );
};

export default CreateSessionSubmitFormButton;
