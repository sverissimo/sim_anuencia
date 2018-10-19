import { configLabels, configEmpLabels, configRtLabels } from '../common/configLabels'

const fieldConfig = (fieldName, spec) => {

    let empMatch = ''
    let empRtMatch = []
    let matches = []

    empMatch = configEmpLabels.filter(el => el.name === fieldName)
    empRtMatch = empMatch.concat(configRtLabels.filter(el => el.name === fieldName))
    matches = empRtMatch.concat(configLabels.filter(el => el.name === fieldName))
 

    if (matches && matches.length > 0)
        switch (spec) {
            case 'div':
                return matches[0].div
            case 'label':
                return matches[0].label
            default:
                return null
        }
};

export default fieldConfig