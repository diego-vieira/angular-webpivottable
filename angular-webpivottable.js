/*global angular*/
(function () {
    'use strict';

    var wpt = angular.module('WebPivotTable-ng', []);
    wpt.directive('wpt',
        function () {
            return {
                scope: {
                    'wpt': '=wpt',
                    'csv': '=csv'
                },
                restrict: 'A',
                link: function link(scope, element, attrs) {
                    var options = scope.wpt || '{}';
                    /*options = angular.extend(options, {
                        availableLocales: ['pt'],
                        decimalPoint: ',',
                        thousandsSep: '.',
                        server: {
                            fileProxyEnabled: 0
                        },
                        chart: {
                            width: null
                        }
                    });*/

                    var myOptions = {
                        locale: 'pt',  // 'en','zh','es','pt',‘fr','de','ar','ru','it','nl','el','he','hi','hu','sv','ko','ja'
                        availableLocales: ['en', 'zh', 'es', 'pt', 'it'],

                        uiFlags: {
                            menuBtn: 1, // show/hide "Menu" dropdown button : 1/0
                            dataSourceBtn: 1, // show/hide "DataSource" dropdown button : 1/0
                            languageSwitchBtn: 1, // show/hide "Language Switch" dropdown button: 1/0
                            helpBtn: 1, // show/hide "Help" button: 1/0
                            aboutBtn: 1, // show/hide "About" button: 1/0

                            openWptMenu: 1,
                            saveWptMenu: 1,
                            sourceDataMenu: 1,
                            exportReportMenu: 1,
                            settingMenu: 1,

                            csvFileMenu: 1,
                            xlsFileMenu: 1,
                            xlsxFileMenu: 1,
                            gssFileMenu: 1,
                            olapCubeMenu: 1,

                            internetLinkMenu: 1,
                            localDriveMenu: 1,
                            cloudDriveMenu: 1,
                            copyPasteMenu: 1,

                            nonEmptyBtn: 1,
                            mdxBtn: 1,

                            pivotFieldsPaneBtn: 1,
                            positionPivotContentBtn: 1,

                            gridOptionBtn: 1,
                            gridStyleBtn: 1,
                            gridZoomBtn: 1,
                            gridFullScreenBtn: 1,
                            gridExportExcelBtn: 1,

                            chartOptionBtn: 1,
                            chartZoomBtn: 1,
                            chartFullScreenBtn: 1,

                            csvGridSizeBtn: 1,
                            csvGridZoomBtn: 1,
                            csvGridExportExcelBtn: 1
                        },

                        fileLinks: [],

                        filepicker: {
                            key: ""  // filepicker application key
                        },

                        decimalPoint: ".",  // decimal point charactor: ".", ","
                        thousandsSep: ",", // thousands separator: "," ".", " "

                        pivotFields: {  //Pivot Fields List pane
                            show: 1,   // show/hide: 1/0
                            position: "right", // position: "left", "top", "right", "bottom"
                            stacked: 0,  //stack fields area or not: 1/0
                            width: 300, // width, only for left and right
                            height: 200 // height, only for top and bottom
                        },

                        pivotLayout: "1", // Pivot Grid and chart layout
                        // 0 -- tile horizontal, 1 -- tile vertical,
                        // 2 -- grid only,  3 -- chart only

                        server: {
                            helpUrl: "http://webpivottable.com/documents",
                            fileProxyEnabled: 1,        // enable/disable file Proxy 1/0
                            fileProxy: "/wpt/fileProxy",
                            fileProxyWithBase64: "/wpt/fileProxyWithBase64",
                            xmlaSync: false,
                            xmlaTimeout: 30000,
                            xmlaProxyEnabled: 1,        // enable/disable Xmla Proxy 1/0
                            xmlaProxy: "/wpt/xmlaProxy",
                            generatePdf: "/wpt/generatePdf"
                        },

                        csvGrid: {
                            zoomScale: 1,
                            zoomScaleStep: 0.05,
                            cellWidth: 120,
                            cellHeight: 21
                        },

                        expandRows: 1,
                        expandCols: 1,

                        olap: {
                            nonEmpty: 1,
                            drillThroughMaxRows: 1000
                        },

                        grid: {
                            showSigns: 1,
                            showRowTotals: 1,
                            showColTotals: 1,
                            showRowSubtotals: 1,
                            showColSubtotals: 1,
                            compactForm: 1,
                            zoomScale: 1,
                            zoomScaleStep: 0.05,
                            rowHeaderWidth: 200,
                            cellWidth: 100,
                            cellHeight: 23,
                            colHeader: {
                                style: {
                                    textAlign: "center",
                                    verticalAlign: "middle",
                                    background: "#bfd6eb",
                                    fontWeight: "bold",
                                    fontSize: "small",
                                    fontStyle: "normal",
                                    textDecoration: "none",
                                    textTransform: "none"
                                }
                            },
                            rowHeader: {
                                style: {
                                    textAlign: "left",
                                    verticalAlign: "middle",
                                    background: "#bfd6eb",
                                    fontWeight: "bold",
                                    fontSize: "small",
                                    fontStyle: "normal",
                                    textDecoration: "none",
                                    textTransform: "none"
                                }
                            },
                            dataCell: {
                                style: {
                                    textAlign: "right",
                                    verticalAlign: "middle",
                                    background: "#fff",
                                    fontWeight: "normal",
                                    fontSize: "small",
                                    fontStyle: "normal",
                                    textDecoration: "none",
                                    textTransform: "none"
                                }
                            },
                            subtotalCell: {
                                style: {
                                    textAlign: "right",
                                    verticalAlign: "middle",
                                    background: "#d2e9e9",
                                    fontWeight: "normal",
                                    fontSize: "small",
                                    fontStyle: "normal",
                                    textDecoration: "none",
                                    textTransform: "none"
                                }
                            },
                            totalCell: {
                                style: {
                                    textAlign: "right",
                                    verticalAlign: "middle",
                                    background: "#72d2df",
                                    fontWeight: "normal",
                                    fontSize: "small",
                                    fontStyle: "normal",
                                    textDecoration: "none",
                                    textTransform: "none"
                                }
                            }
                        },
                        chart: {
                            width: 1000,
                            height: 300,
                            zoomScale: 1,
                            zoomScaleStep: 0.05,
                            vIndex: 0, // value field index (not id)
                            sIndex: 0, // series index of pie chart

                            high: {
                                theme: "default", //default, grid, gray, skies, drak-blue, drak-green
                                chart: {
                                    type: 'column',  //column, bar, line, spline, area, areaspline, pie
                                    options3d: {
                                        enabled: false,
                                        alpha: 15,
                                        beta: 15,
                                        depth: 50,
                                        viewDistance: 25
                                    }
                                },
                                credits: {
                                    enabled: false
                                },
                                exporting: {
                                    enabled: true
                                },
                                navigation: {
                                    buttonOptions: {
                                        align: 'right',   // left, center, right
                                        verticalAlign: 'top' // top, middle, bottom
                                    }
                                },
                                legend: {
                                    enabled: true,
                                    floating: false,
                                    layout: 'vertical',  //horizontal, vertical
                                    align: 'right',      // left, center, right
                                    verticalAlign: 'middle', // top, middle, bottom
                                    reversed: false
                                },
                                tooltip: {
                                    enabled: true,
                                    shadow: true
                                },
                                plotOptions: {
                                    series: {
                                        stacking: null //null, 'normal', "percent"
                                    }
                                },
                                xAxis: {
                                    labels: {
                                        enabled: true,
                                        align: 'left',  // left, center, right
                                        rotation: 45    // 0 -- 360
                                    }
                                }
                            }
                        }
                    };
                    var webPivotTable;
                    require(["wpt/WebPivotTable", "dojo/domReady!"], function (WebPivotTable) {
                        webPivotTable = new WebPivotTable({customOptions: options}, attrs.id);
                    });

                    scope.$watch('csv', function(newVal) {
                        if (angular.isDefined(newVal) && angular.isDefined(webPivotTable)) {
                            webPivotTable.setCsvRawData(newVal);
                        }
                    }, true);
                }
            };
        }
    );
})();
