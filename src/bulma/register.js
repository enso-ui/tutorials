import Tutorial from './components/settings/Tutorial.vue';

export default App => {
    App.registerSettingsItem('tutorials', Tutorial, 350);
};
