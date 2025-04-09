package com.mappls.sdk.maps.rctmgl.components.geoAnalytics;

public class LayerRequest {

    private String [] geoBound;
    private String[] propertyNames;
    private String attribute;
    private String query;
    private StyleRequest styleRequest;

    public String[] getGeoBound() {
        return geoBound;
    }

    public void setGeoBound(String[] geoBound) {
        this.geoBound = geoBound;
    }

    public String[] getPropertyNames() {
        return propertyNames;
    }

    public void setPropertyNames(String[] propertyNames) {
        this.propertyNames = propertyNames;
    }

    public StyleRequest getStyleRequest() {
        return styleRequest;
    }

    public void setStyleRequest(StyleRequest styleRequest) {
        this.styleRequest = styleRequest;
    }

    public String getAttribute() {
        return attribute;
    }

    public void setAttribute(String attribute) {
        this.attribute = attribute;
    }

    public String getQuery() {
        return query;
    }

    public void setQuery(String query) {
        this.query = query;
    }
}
