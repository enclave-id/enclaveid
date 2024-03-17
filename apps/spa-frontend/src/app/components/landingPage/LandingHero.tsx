import { Link } from 'react-router-dom';
import { Button } from '../Button';

function LandingHero() {
  let x = true;
  if (x) {
    return (
      <section className="h-[calc(100vh-88px)] bg-[#32433F] overflow-hidden relative">
        <div className="pt-[104px] pb-14 flex flex-col items-center justify-center gap-10 max-w-[830px] mx-auto relative z-10">
          <div className="flex flex-col gap-6">
            <h1 className="text-white text-[86px] leading-[77px] tracking-[-0.03em] text-center">
              Discover what your{' '}
              <span className="font-semibold text-greenBg">data says</span>{' '}
              about you
            </h1>
            <p className="text-[#D6D9D9]/80 text-xl tracking-[-0.02em] leading-7 text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              in neque vel diam consequat feugiat. Suspendisse potenti. Nunc
              placerat ac elit in finibus.
            </p>
          </div>
          <div>
            <Button label="Join Us Now!" />
          </div>
        </div>
        <div className="w-full h-full flex items-center justify-center relative z-10">
          <div className="max-w-[1174px] w-full h-full bg-[#364743] rounded-[40px]"></div>
          <div className="max-w-[1274px] w-full h-full bg-[#3D514C] rounded-[40px] top-10 absolute"></div>
        </div>
        <div className="absolute bottom-0 left-0">
          <svg
            width="734"
            height="775"
            viewBox="0 0 734 775"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M-293.534 0.82011L505.786 450.634L732.934 1276.51M-309.12 14.119L489.688 463.645L716.706 1289.06M-324.713 27.4061L473.6 476.658L700.488 1301.61M-340.298 40.7051L457.501 489.669L684.26 1314.15M-355.883 54.0041L441.413 502.682L668.042 1326.7M-371.478 67.301L425.315 515.692L651.814 1339.25M-387.064 80.6001L409.225 528.715L635.598 1351.78M-402.659 93.8971L393.126 541.726L619.37 1364.33M-418.244 107.196L377.028 554.737L603.151 1376.88M-433.839 120.493L360.94 567.75L586.923 1389.42M-449.424 133.792L344.842 580.761L570.705 1401.97M-465.017 147.079L328.754 593.774L554.477 1414.52M-480.603 160.378L312.655 606.785L538.259 1427.06M-496.198 173.675L296.567 619.798L522.031 1439.61M-511.783 186.974L280.467 632.818L505.815 1452.15M-527.368 200.273L264.369 645.829L489.587 1464.69M-542.963 213.57L248.28 658.842L473.369 1477.24M-558.549 226.869L232.182 671.853L457.141 1489.79M-574.144 240.166L216.094 684.866L440.923 1502.33M-589.729 253.465L199.996 697.877L424.695 1514.88M-605.322 266.752L183.898 710.888L408.477 1527.43M-620.908 280.051L167.809 723.901L392.249 1539.97M-636.503 293.348L151.709 736.921L376.03 1552.52M-652.088 306.647L135.621 749.934L359.804 1565.06M-667.673 319.946L119.523 762.945L343.586 1577.6M-683.268 333.243L103.434 775.958L327.358 1590.15M-698.853 346.542L87.3363 788.969L311.14 1602.7M-714.449 359.839L71.2381 801.98L294.912 1615.24M-730.034 373.138L55.1498 814.993L278.694 1627.79M-745.627 386.425L39.0516 828.004L262.466 1640.34M-761.212 399.724L22.9633 841.017L246.248 1652.88M-776.807 413.021L6.86316 854.037L230.022 1665.42M-792.393 426.32L-9.22516 867.05L213.804 1677.97M-807.978 439.619L-25.3233 880.061L197.576 1690.51M-823.573 452.916L-41.4214 893.072L181.358 1703.06M-839.158 466.215L-57.5098 906.085L165.13 1715.61M-854.753 479.512L-73.6079 919.096L148.912 1728.16M-870.339 492.811L-89.6962 932.109L132.684 1740.7M-885.934 506.108L-105.794 945.12L116.465 1753.25M-901.517 519.397L-121.885 958.143L100.239 1765.78M-917.112 532.694L-137.983 971.153L84.0213 1778.33M-932.697 545.993L-154.081 984.164L67.7933 1790.88M-948.283 559.292L-170.169 997.177L51.5752 1803.43M-963.878 572.589L-186.267 1010.19L35.3472 1815.97M-979.463 585.888L-202.356 1023.2L19.129 1828.52M-995.058 599.185L-218.454 1036.21L2.90109 1841.06M-1010.64 612.484L-234.542 1049.22L-13.3171 1853.61M-1026.24 625.781L-250.642 1062.25L-29.5333 1866.15M-1041.82 639.07L-266.741 1075.26L-45.7612 1878.7M-1057.42 652.367L-282.829 1088.27L-61.9794 1891.24M-1073 665.666L-298.927 1101.28L-78.2074 1903.79M-1088.59 678.965L-315.015 1114.29L-94.4256 1916.34M-1104.18 692.262L-331.114 1127.3L-110.653 1928.88M-1119.77 705.561L-347.202 1140.32L-126.872 1941.43M-1135.36 718.858L-363.3 1153.33L-143.1 1953.98M-1150.95 732.157L-379.4 1166.35L-159.318 1966.52M-1166.54 745.454L-395.489 1179.36L-175.544 1979.06"
              stroke="url(#paint0_linear_803_41)"
              stroke-miterlimit="10"
            />
            <defs>
              <linearGradient
                id="paint0_linear_803_41"
                x1="102"
                y1="134.502"
                x2="262.5"
                y2="1058"
                gradientUnits="userSpaceOnUse"
              >
                <stop
                  offset="0.138406"
                  stop-color="#2FA68A"
                  stop-opacity="0.18"
                />
                <stop offset="1" stop-color="white" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="absolute top-0 right-0">
          <svg
            width="859"
            height="729"
            viewBox="0 0 859 729"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1119.53 727.952L289.074 338.599L1.35702 -468.18M1134.08 713.534L304.163 324.431L16.6107 -481.894M1148.65 699.128L319.243 310.262L31.8546 -495.609M1163.21 684.711L334.333 296.094L47.1084 -509.322M1177.76 670.294L349.413 281.925L62.3523 -523.037M1192.33 655.878L364.503 267.757L77.6061 -536.751M1206.89 641.461L379.584 253.578L92.8487 -550.456M1221.45 627.045L394.674 239.41L108.102 -564.169M1236.01 612.628L409.764 225.242L123.346 -577.884M1250.58 598.212L424.844 211.073L138.6 -591.598M1265.13 583.795L439.934 196.905L153.844 -605.313M1279.7 569.389L455.014 182.736L169.098 -619.026M1294.26 554.971L470.104 168.568L184.342 -632.741M1308.82 540.555L485.183 154.399L199.596 -646.455M1323.38 526.138L500.275 140.221L214.838 -660.16M1337.94 511.721L515.364 126.053L230.092 -673.873M1352.51 497.305L530.444 111.884L245.336 -687.588M1367.06 482.888L545.534 97.7159L260.59 -701.302M1381.63 468.472L560.614 83.5467L275.833 -715.016M1396.19 454.055L575.704 69.3787L291.087 -728.73M1410.75 439.649L590.794 55.2108L306.331 -742.445M1425.31 425.232L605.874 41.0416L321.585 -756.158M1439.88 410.816L620.965 26.8638L336.829 -769.873M1454.43 396.399L636.045 12.6945L352.081 -783.577M1468.99 381.981L651.135 -1.47338L367.325 -797.292M1483.56 367.565L666.215 -15.6425L382.579 -811.005M1498.11 353.148L681.304 -29.8105L397.823 -824.72M1512.68 338.732L696.394 -43.9784L413.077 -838.434M1527.24 324.315L711.474 -58.1476L428.321 -852.149M1541.8 309.909L726.564 -72.3156L443.574 -865.862M1556.36 295.492L741.644 -86.4847L458.818 -879.577M1570.93 281.076L756.735 -100.663L474.071 -893.281M1585.49 266.659L771.815 -114.832L489.315 -906.996M1600.04 252.241L786.905 -129L504.568 -920.709M1614.61 237.825L801.995 -143.168L519.812 -934.424M1629.17 223.408L817.075 -157.337L535.066 -948.138M1643.73 208.992L832.165 -171.505L550.31 -961.853M1658.29 194.575L847.244 -185.674L565.564 -975.566M1672.86 180.159L862.334 -199.842L580.808 -989.281M1687.41 165.752L877.416 -214.021L596.06 -1002.98M1701.98 151.336L892.505 -228.189L611.304 -1016.7M1716.54 136.919L907.595 -242.357L626.558 -1030.41M1731.09 122.501L922.675 -256.526L641.802 -1044.13M1745.66 108.086L937.765 -270.694L657.055 -1057.84M1760.22 93.6682L952.845 -284.863L672.299 -1071.56M1774.79 79.2523L967.935 -299.031L687.553 -1085.27M1789.34 64.8352L983.015 -313.2L702.797 -1098.98M1803.91 50.4192L998.106 -327.378L718.04 -1112.69M1818.47 36.0119L1013.2 -341.546L733.293 -1126.4M1833.03 21.596L1028.28 -355.715L748.537 -1140.12M1847.59 7.17874L1043.37 -369.883L763.791 -1153.83M1862.15 -7.23849L1058.45 -384.052L779.035 -1167.55M1876.71 -21.6544L1073.54 -398.22L794.289 -1181.26M1891.27 -36.0717L1088.62 -412.39L809.533 -1194.98M1905.84 -50.4877L1103.71 -426.558L824.786 -1208.69M1920.39 -64.9048L1118.8 -440.735L840.03 -1222.4M1934.96 -79.3207L1133.88 -454.905L855.283 -1236.11"
              stroke="url(#paint0_linear_803_42)"
              stroke-miterlimit="10"
            />
            <defs>
              <linearGradient
                id="paint0_linear_803_42"
                x1="1443.7"
                y1="-648.151"
                x2="294.229"
                y2="344.568"
                gradientUnits="userSpaceOnUse"
              >
                <stop
                  offset="0.431558"
                  stop-color="#2FA68A"
                  stop-opacity="0.18"
                />
                <stop offset="1" stop-color="#344541" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>
    );
  }
  return (
    <section className="bg-white lg:pt-8 md:pt-7 pt-4 pb-14 md:pb-[72px] lg:pb-[84px]">
      <div className="landing-container">
        <div className="flex lg:flex-row flex-col items-center md:gap-8 sm:gap-6 gap-4 lg:gap-10">
          <div className="lg:max-w-[624px] lg:text-left text-center w-full flex flex-col gap-9">
            <h1 className="text-passiveLinkColor font-medium text-3xl md:text-4xl lg:text-[46px] lg:leading-[60px] lg:-tracking-[0.02em]">
              Unleash the true power of your data
            </h1>
            <p className="text-passiveLinkColor md:text-xl text-lg lg:text-[22px] lg:-tracking-[0.02em] lg:leading-7">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              in neque vel diam consequat feugiat. Suspendisse potenti. Nunc
              placerat ac elit in finibus.
            </p>
            <div className="flex items-center lg:justify-start justify-center gap-3.5">
              <Link to="/login">
                <button className="py-3 px-7 outline outline-1 outline-[#E5E8EE] rounded-full text-passiveLinkColor text-[22px] leading-[26px] -tracking-[0.02em]">
                  Log In
                </button>
              </Link>
              <Link to="/signup">
                <button className="py-3 px-7 bg-greenBg text-white text-[22px] leading-[26px] -tracking-[0.02em] rounded-full">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
          <div className="w-full min-h-[413px] wobble-image">
            <img
              src="/hero.webp"
              alt="hero"
              style={{
                clipPath: 'inset(0px 0px 100px 0px round 10px)',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export { LandingHero };
