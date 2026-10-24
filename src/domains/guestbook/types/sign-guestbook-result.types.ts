interface SignGuestbookSuccess {
  isSuccess: true;
}

interface SignGuestbookFailure {
  isSuccess: false;
  errorMessage: string;
}

export type SignGuestbookResult = SignGuestbookSuccess | SignGuestbookFailure;
