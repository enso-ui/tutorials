<script>
import { getActivePinia } from 'pinia';

const useStore = id => {
    const store = getActivePinia()?._s?.get(id);

    if (!store) {
        throw new Error(`Missing Pinia store: ${id}`);
    }

    return store;
};

export default {
    name: 'Tutorial',

    inject: ['errorHandler', 'http', 'i18n', 'route'],

    props: {
        labels: {
            type: Object,
            default: () => ({
                done: 'Done',
                close: 'Close',
                next: 'Next',
                previous: 'Previous',
            }),
        },
    },

    data: () => ({
        driver: null,
    }),

    methods: {
        async resolveDriver() {
            if (this.driver) {
                return this.driver;
            }

            const module = await import('driver.js');
            const Driver = module.default?.default
                ?? module.default
                ?? module.Driver
                ?? module;

            this.driver = new Driver({
                animate: false,
                doneBtnText: this.i18n(this.labels.done),
                closeBtnText: this.i18n(this.labels.close),
                nextBtnText: this.i18n(this.labels.next),
                prevBtnText: this.i18n(this.labels.previous),
            });

            return this.driver;
        },
        async fetch() {
            await this.resolveDriver();

            this.http.get(this.route('system.tutorials.load'), {
                params: { route: this.$route.name },
            }).then(({ data }) => this.start(data))
                .catch(this.errorHandler);
        },
        start(steps) {
            if (!steps.length) {
                return;
            }

            useStore('layout').toggleSettings();
            this.driver.defineSteps(this.localise(steps));
            this.driver.start();
        },
        localise(steps) {
            return steps.map(({ element, popover }) => ({
                element,
                popover: {
                    description: this.i18n(popover.description),
                    position: popover.position,
                    title: this.i18n(popover.title),
                },
            }));
        },
    },

    render() {
        return this.$slots.default({
            itemEvents: {
                click: this.fetch,
            },
        });
    },
};
</script>
