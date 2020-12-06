export const signOut = async (firebase: any): Promise<boolean> => {
  if (!firebase) return false;

  try {
    if (await firebase.auth().signOut()) {
      return true;
    }
    return false;
  } catch (e) {
    console.error(e);
    return false;
  }
};
