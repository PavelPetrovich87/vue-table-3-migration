import Vuetable from './components/Vuetable.vue'

import VuetableFieldMixin from './components/VuetableFieldMixin.vue'
import VuetableFieldCheckboxMixin from './components/VuetableFieldCheckboxMixin.vue'
import VuetablePaginationMixin from './components/VuetablePaginationMixin.vue'
import VuetablePaginationInfoMixin from './components/VuetablePaginationInfoMixin.vue'

import VuetablePagination from './components/VuetablePagination.vue'
import VuetablePaginationDropDown from './components/VuetablePaginationDropdown.vue'
import VuetablePaginationInfo from './components/VuetablePaginationInfo.vue'
import VuetableFieldCheckbox from './components/VuetableFieldCheckbox.vue'
import VuetableFieldHandle from './components/VuetableFieldHandle.vue'
import VuetableFieldSequence from './components/VuetableFieldSequence.vue'
import VuetableRowHeader from './components/VuetableRowHeader.vue'
import VuetableColGutter from './components/VuetableColGutter.vue'

export default {
    VuetableFieldMixin,
    VuetableFieldCheckboxMixin,
    VuetablePaginationMixin,
    VuetablePaginationInfoMixin,
    install(app, options) {
        app.component('Vuetable', Vuetable),
        app.component('VuetablePagination', VuetablePagination),
        app.component('VuetablePaginationDropDown', VuetablePaginationDropDown),
        app.component('VuetablePaginationInfo', VuetablePaginationInfo),
        app.component('VuetableFieldCheckbox', VuetableFieldCheckbox),
        app.component('VuetableFieldHandle', VuetableFieldHandle),
        app.component('VuetableRowHeader', VuetableRowHeader),
        app.component('VuetableColGutter', VuetableColGutter),
        app.component('VuetableFieldSequence', VuetableFieldSequence)
    }
}
