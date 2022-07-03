export default function calculatePoints(poly, pt) {

    for(var validate = false, i = 0, l = poly.length, j = l - 1; i < l; j = i++)
        ((poly[i][0] <= pt[0] && pt[0] < poly[j][0]) || (poly[j][0] <= pt[0] && pt[0] < poly[i][0]))
        && (pt[1] < (poly[j][1] - poly[i][1]) * (pt[0] - poly[i][0]) / (poly[j][0] - poly[i][0]) + poly[i][1])
        && (validate = !validate);
    return validate;
}