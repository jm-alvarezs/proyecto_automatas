import React, { Component } from "react";

export default class Dropzone extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleFiles = this.handleFiles.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  componentDidMount() {
    this.setDropZone();
  }

  setDropZone() {
    let area = document.getElementById("drop-area");
    ["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
      area.addEventListener(eventName, this.preventDefaults, false);
    });
    area.addEventListener("drop", this.handleDrop, false);
  }

  preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  handleDrop(e) {
    let files = e.dataTransfer.files;
    this.handleFiles(files);
  }

  handleSelect(e) {
    this.handleFiles(e.target.files);
  }

  handleFiles(files) {
    if (files && this.props.modifier)
      for(let i = 0; i < files.length; i++)
        this.props.modifier(files[i]);
  }

  render() {
    return (
      <div
        id="drop-area"
        style={{ height: 150, width: "100%" }}
        className="bg-light border text-center pt-5"
      >
        <label className="d-block text-center m-auto">
          Selecciona imágenes o arrástralas
        </label>
        <input
          className="d-block text-center m-auto"
          type="file"
          multiple
          accept="image/*"
          onChange={this.handleSelect}
        />
      </div>
    );
  }
}
