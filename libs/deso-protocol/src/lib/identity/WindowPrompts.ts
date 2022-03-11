export const requestApproval = (transactionHex: string): Window => {
  const prompt = window.open(
    `https://identity.deso.org/approve?tx=${transactionHex}`,
    null as unknown as any,
    'toolbar=no, width=800, height=1000, top=0, left=0'
  ) as Window;
  return prompt;
};

export const requestLogin = (accessLevel = '4'): Window => {
  const prompt = window.open(
    `https://identity.deso.org/log-in?accessLevelRequest=${accessLevel}&hideJumio=true`,
    null as unknown as any,
    'toolbar=no, width=800, height=1000, top=0, left=0'
  ) as Window;
  return prompt;
};

export const requestLogout = (publicKey: string): Window => {
  const prompt = window.open(
    `https://identity.deso.org/logout?publicKey=${publicKey}`,
    null as unknown as any,
    'toolbar=no, width=800, height=1000, top=0, left=0'
  ) as Window;
  return prompt;
};
