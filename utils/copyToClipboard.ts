import RootStore from '../store/rootStore';

export const copyToClipboard = (rootStore: RootStore, toClipboard: string) => {
  rootStore.showSnackbar('Скопировано в буфер обмена.', 'success');
  navigator.clipboard.writeText(toClipboard);
};
