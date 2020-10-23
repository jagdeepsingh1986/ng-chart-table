export class StyledDataset {
    graphType: string;
    label: string;
    absoluteData: number[] = [];
    data: number[] = [];
    categories: string[] = [];
    isActive: boolean = false;
    lineTension = 0.3;
    fill: boolean | string = false;
    backgroundColor: string[] | string;
    borderColor: string;
    pointBorderColor: string;
    pointBackgroundColor: string;
    // spanGaps => connect points even if there are undefined values between them
    spanGaps = true;

    /**
     * Transform #RRGGBBAA to rgba(RR, GG, BB, AA)
     *
     * @param hex6 string Color defined by #RRGGBB template
     * @param alpha string Opacity
     */
    _Hex8ToRgba(hex6: string, alpha: string) {
        const red = parseInt(hex6.substr(1, 2), 16);
        const green = parseInt(hex6.substr(3, 2), 16);
        const blue = parseInt(hex6.substr(5, 2), 16);
        return ('rgba(' + red + ',' + green + ',' + blue + ',' + alpha + ')');
    }
}