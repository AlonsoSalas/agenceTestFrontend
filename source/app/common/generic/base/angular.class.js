class AngularClass {
    constructor(dependencyValues, dependencyNames, shortnames = {}) {
        this._setShortnameRules(shortnames)
        this._setDependencies(dependencyValues, dependencyNames, shortnames);
    }

    _getPropertyName(dependencyName, shortname) {
        return !!shortname ? shortname : dependencyName;
    }

    _setShortnameRules(shortnames) {
        const globalRules = {
            SweetAlert: '.swal',
        }
        return Object.assign(shortnames, globalRules)
    }

    _setDependencies(dependencyValues, dependencyNames, shortnames) {
        dependencyValues.forEach((dependency, index) => {
            let shortname = null;
            let newDependency = null;
            let shorthandProperty = shortnames[dependencyNames[index]];


            if (shorthandProperty !== undefined) {
                if (shorthandProperty.charAt(0) === '.') {
                    const property = shorthandProperty.slice(1);
                    newDependency = dependency[property];
                    shortname = property
                } else {
                    shortname = shorthandProperty;
                }
            }

            this[this._getPropertyName(dependencyNames[index], shortname)] = newDependency || dependency;
        })
    }



}

module.exports = AngularClass
