const molecularNameResolver = ({ fullMaterial }) => {
    let materialString = "";
    fullMaterial.forEach((position) => {
        materialString += (position.element + position.weight.sub());
    })
    return materialString
}

export default molecularNameResolver;