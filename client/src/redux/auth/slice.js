import { createSlice } from '@reduxjs/toolkit';
import { register, login, logOut, refreshUser } from './operations';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {
            name: null,
            email: null,
            isActivated: null
        },
        token: null,
        isLoggedIn: false,
        isRefreshing: false,
        isInitialized: false,
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.accessToken;
                state.isLoggedIn = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.accessToken;
                state.isLoggedIn = true;
            })
            .addCase(logOut.fulfilled, (state) => {
                state.user = { name: null, email: null, isActivated: null };
                state.token = null;
                state.isLoggedIn = false;
            })
            .addCase(refreshUser.pending, (state) => {
                state.isRefreshing = true;
            })
            .addCase(refreshUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.accessToken;
                state.isLoggedIn = true;
                state.isRefreshing = false;
            })
            .addCase(refreshUser.rejected, (state) => {
                state.isRefreshing = false;
            });
        builder.addMatcher(
            (action) => {
                return action.type.startsWith('auth/');
            },
            (state) => {
                // При любом действии в слайсе авторизации (например, когда диспатчится любое действие из этого слайса),
                // мы устанавливаем флаг isInitialized в true, чтобы показать, что состояние авторизации было инициализировано
                state.isInitialized = true;
            }
        );
    },
});

export default authSlice.reducer;
