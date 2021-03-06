/*
*    StatusPilatus: Monitor your PC like never before!
*    Copyright (C) 2018 PilatusDevs
*
*    This program is free software: you can redistribute it and/or modify
*    it under the terms of the GNU General Public License as published by
*    the Free Software Foundation, either version 3 of the License, or
*    (at your option) any later version.
*
*    This program is distributed in the hope that it will be useful,
*    but WITHOUT ANY WARRANTY; without even the implied warranty of
*    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*    GNU General Public License for more details.
*
*    You should have received a copy of the GNU General Public License
*    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
/* global si $ */
"use strict";

module.exports = {
    init: initGpu,
    refresh: refreshGpu,
    activate: activateGpu
};

// Storing static GPU title
let gpuTitle = "";
const gpuData = [];

function initGpu() {
    // Nothing
}

function activateGpu() {
    if (gpuData.length === 0) {
        si.graphics()
            .then(data => {
                const allGpus = data.controllers;
                let subtitle = allGpus[0].model;
                gpuData.push(allGpus[0]);
                if (allGpus.length > 1) {
                    allGpus.shift();
                    allGpus.forEach(gpu => {
                        subtitle += " + "+gpu.model;
                        gpuData.push(gpu);
                    });
                }
                gpuTitle = subtitle;
                $("#subtitle").text(gpuTitle);
                $("#gpu-container").html(gpuHtml(gpuData));
            });
    } else {
        $("#subtitle").text(gpuTitle);
        $("#gpu-container").html(gpuHtml(gpuData));
    }
}

function refreshGpu() {
    // Nothing
}

function gpuHtml(gpuData) {
    let body = "";
    gpuData.forEach((gpu, index) => {
        body += `<div class="col-md-4 col-sm-6">
        <h3>GPU ${index+1}</h3>
        <b>Vendor</b>: ${gpu.vendor}<br />
        <b>Model</b>: ${gpu.model}<br />
        <b>VRAM</b>: ${gpu.vram} MB, ${(gpu.vramDynamic ? "dynamic" : "undynamic")}<br />
        <b>Bus</b>: ${gpu.bus}<br />
        </div>`;
    });
    return body;
}
