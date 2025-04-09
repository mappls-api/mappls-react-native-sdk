package com.mappls.sdk.maps.rctmgl.components.geoAnalytics;

public class StyleRequest {
      private String labelColor;
      private Integer labelSize;
      private String fillColor;
      private Integer pointSize;
      private String  strokeColor;
      private Double strokeWidth;
      private Double fillOpacity;

    public String getLabelColor() {
        return labelColor;
    }

    public void setLabelColor(String labelColor) {
        this.labelColor = labelColor;
    }

    public Integer getLabelSize() {
        return labelSize;
    }

    public void setLabelSize(Integer labelSize) {
        this.labelSize = labelSize;
    }

    public String getFillColor() {
        return fillColor;
    }

    public void setFillColor(String fillColor) {
        this.fillColor = fillColor;
    }

    public Integer getPointSize() {
        return pointSize;
    }

    public void setPointSize(Integer pointSize) {
        this.pointSize = pointSize;
    }

    public String getStrokeColor() {
        return strokeColor;
    }

    public void setStrokeColor(String strokeColor) {
        this.strokeColor = strokeColor;
    }

    public Double getStrokeWidth() {
        return strokeWidth;
    }

    public void setStrokeWidth(Double strokeWidth) {
        this.strokeWidth = strokeWidth;
    }

    public Double getFillOpacity() {
        return fillOpacity;
    }

    public void setFillOpacity(Double fillOpacity) {
        this.fillOpacity = fillOpacity;
    }
}
