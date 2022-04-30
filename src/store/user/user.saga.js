import { takeLatest, all, call, put } from 'redux-saga/effects';

import { USER_ACTION_TYPES } from './user.types';

import { signInSuccess, signInFailure, signUpFailure, signUpSuccess } from './user.action';
import { 
    getCurrentUser, 
    createUserDocumentFromAuth,
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword,
    createAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';


export function* getSnapShotFromUserAuth(userAuth, additonalDetails) {
    try {
        const userSnapshot = yield call(createUserDocumentFromAuth, userAuth, additonalDetails);
        yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data()}));
    } catch (error) {
        yield put(signInFailure(error));
    }
};

export function* signInWithGoogle() {
    try {
        const { user } = yield call(signInWithGooglePopup);
        yield call(getSnapShotFromUserAuth, user);
    } catch (error) {
        yield put(signInFailure(error));
    }
};

export function* signInWithEmail({ payload: { email, password }}) {
    try {
        const { user } = yield call(signInAuthUserWithEmailAndPassword, email, password);
        yield call(getSnapShotFromUserAuth, user);
    } catch (error) {
        let errorMsg = "Something went wrong with login";
        switch (error.code) {
            case "auth/wrong-password":
                alert("Incorrect Password")
                errorMsg = "Incorrect Password"
                break;
            case "auth/user-not-found":
                alert("No user associated with this email")
                errorMsg = "No user associated with this email"
                break;
            default:
                console.log("sign in error is ", error)
                break;
        }
        yield put(signInFailure(errorMsg));
    }
};

export function* signUp({ payload: { email, password, displayName }}) {
    try {
        const { user } = yield call(createAuthUserWithEmailAndPassword, email, password);
        yield put(signUpSuccess(user, { displayName }));
    } catch (error) {
        yield put(signUpFailure(error));
    }
};

export function* signInAfterSignUp({ payload: { user, additonalDetails }}) {
    yield call(getSnapShotFromUserAuth, user, additonalDetails);
}

export function* isUserAuthenticated(){
    try {
        const userAuth = yield call(getCurrentUser);
        if(!userAuth) return;
        yield call(getSnapShotFromUserAuth, userAuth);
    } catch (error) {
        yield put(signInFailure(error));
    }
};

export function* onGoogleSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
};

export function* onEmailSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail)
};

export function* onCheckUsserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
};

export function* onSignUpStart(){
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
};

export function* onSignUpSuccess(){
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* userSaga(){
    yield all([
        call(onCheckUsserSession),
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onSignUpStart),
        call(onSignUpSuccess),
    ])
};