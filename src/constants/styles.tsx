import { StyleSheet } from "react-native";
import colors from "./colors";

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: colors.backgroundPrimary,
        borderBottomWidth: 1,
        borderBottomColor: colors.strokeBorder,
        zIndex: 20,
    },
    leftSection: {
        flexDirection: "row",
        alignItems: "center",
    },
    backBtn: {
        marginRight: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.textPrimary,
    },
    settingsIcon: {
        width: 24,
        height: 24,
    },
    addressContainer: {
        backgroundColor: colors.backgroundPrimary,
        padding: 8,

    },
    addressText: {
        color: colors.textPrimary,
        textAlign: "left",
    },
    transportContainer: {
        flexDirection: "row",
        backgroundColor: colors.backgroundPrimary,
        borderBottomWidth: 1,
        borderColor: colors.strokeBorder,
        borderWidth: 1,
        paddingVertical: 5,
        marginHorizontal: 10,
        marginVertical: 8,
    },
    transportButton: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        paddingVertical: 10,
        position: "relative",
    },
    activeButton: {},
    transportText: {
        color: colors.textSecondary,
        fontSize: 14,
        fontWeight: "500",
    },
    activeText: {
        color: colors.textPrimary,
        fontWeight: "600",
    },
    text: {
        color: colors.textPrimary,
        fontSize: 14,
    },
    statusContainer: {
        position: "absolute",
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: colors.backgroundPrimary,
        padding: 10,
        alignItems: "center",
        borderRadius: 8,
        elevation: 4,
    },
    statusText: {
        color: colors.textPrimary,
        fontSize: 14,
        marginBottom: 2,
    },
    checkboxRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    checkbox: {
        marginRight: 8,
    },
    label: {
        fontSize: 16,
        color: colors.textPrimary,
    },
    innerContainer: {
        flex: 1,
    },
    overlay: {
        position: "absolute",
        right: 10,
        backgroundColor: colors.backgroundSecondry,
        padding: 12,
        borderRadius: 8,
        marginTop: 50,
    },
    switchContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    button: {
        backgroundColor: colors.backgroundPrimary,
        paddingVertical: 10,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: colors.accentPrimary,
        alignItems: "center",
        marginVertical: 10,
        paddingHorizontal: 10,
    },
    buttonText: {
        color: colors.accentPrimary,
        fontWeight: "600",
    },
    calloutContainer: {
        backgroundColor: colors.backgroundSecondry,
        padding: 5,
        borderRadius: 5,
        alignSelf: "flex-start",
        alignItems: "center",
    },
    calloutText: {
        fontSize: 20,
        color: colors.textPrimary,
        fontWeight: "bold",
    },
    activeToggle: {
        borderWidth: 1,
        borderColor: colors.accentPrimary,
        borderRadius: 30,
    },
    activeToggleText: {
        color: colors.accentPrimary,
    },
    inactiveToggleText: {
        color: colors.textPrimary,
    },
    responseContent: {
        padding: 16,
    },
    responseContainer: {
        position: "absolute",
        flex: 1,
        backgroundColor: colors.backgroundSecondry,
        overflow: "hidden",
    },
    responseText: {
        color: colors.textPrimary,
        fontSize: 14,
        paddingVertical: 30
    },
    bottomToggleContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        padding: 10,
        borderTopWidth: 1,
        borderColor: colors.strokeBorder,
        backgroundColor: colors.backgroundPrimary,
    },
    toggleBtn: {
        flex: 1,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        marginHorizontal: 5,
    },
    inactiveToggle: {
        borderColor: colors.textPrimary,
        borderWidth: 1,
        borderRadius: 20,
    },
    radioGroup: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderColor: colors.strokeBorder,
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 8,
        paddingVertical: 10,
        marginHorizontal: 10,
        marginVertical: 10,
    },
    radioButton: {
        flexDirection: "row",
        alignItems: "center",
    },
    radioOuter: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors.textSecondary,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 8,
    },
    radioOuterActive: {
        borderColor: colors.accentPrimary,
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: colors.accentPrimary,
    },
    radioLabel: {
        color: colors.textSecondary,
        fontSize: 14,
    },
    radioLabelActive: {
        color: colors.textPrimary,
        fontWeight: "500",
    },
    activeIndicator: {
        position: "absolute",
        bottom: -5,
        height: 2,
        width: "60%",
        backgroundColor: colors.accentPrimary,
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2,
    },
    annotationMarker: {
        width: 20,
        height: 20,
        backgroundColor: colors.accentPrimary,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors.textPrimary,
    },
    placesListContainer: {
        backgroundColor: colors.backgroundSecondry,
        flex: 1,
        paddingHorizontal: 14,
        paddingVertical: 8,
        marginHorizontal: 0,
        marginTop: 5,
    },
    placeItem: {
        paddingVertical: 10,
        borderBottomColor: colors.strokeBorder,
        borderBottomWidth: 1,
    },
    placeText: {
        color: colors.textPrimary,
        fontSize: 14,
    },
    mapWrapper: {
        flex: 1,
        marginTop: 8,
    },
    toggleContainer: {
        flexDirection: "row",
        backgroundColor: colors.backgroundPrimary,
        borderRadius: 30,
        padding: 4,
        alignSelf: "center",
        marginVertical: 10,
        marginHorizontal: 10,
    },
    activeBtn: {
        backgroundColor: colors.accentPrimary,
    },
    toggleText: {
        color: colors.textSecondary,
        fontSize: 16,
        fontWeight: "600",
    },
    dataBtn: {
        borderColor: colors.accentPrimary,
        borderWidth: 1,
        borderRadius: 20,
    },
    selectionBox: {
        position: "absolute",
        width: 200,
        height: 200,
        top: "40%",
        left: "50%",
        marginLeft: -75,
        marginTop: -75,
        backgroundColor: colors.accentPrimary,
        opacity: 0.5,
        borderWidth: 1,
        borderColor: colors.accentPrimary,
        borderRadius: 4,
    },
    title: {
        color: colors.textPrimary,
        fontSize: 14,
        fontWeight: "bold",
    },
    searchButton: {
        backgroundColor: colors.accentPrimary,
        borderRadius: 8,
        padding: 10,
        alignItems: "center",
        marginTop: 0,
    },
    inputField: {
        backgroundColor: colors.backgroundSecondry,
        color: colors.textPrimary,
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 10,
        marginRight: 10,
        borderColor: colors.strokeBorder,
        textAlignVertical: "center",
    },
    inputContainer: {
        padding: 10,
        backgroundColor: colors.backgroundPrimary,
        borderBottomWidth: 1,
        borderBottomColor: colors.strokeBorder,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 5,
        paddingVertical: 5,
    },
    card: {
        backgroundColor: colors.backgroundSecondry, // ✅
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 12,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: colors.strokeBorder,

    },
    cardImage: {
        width: "100%",
        height: 120,
    },
    cardContent: {
        padding: 12,
        flexDirection: "row",
        alignItems: "center",
    },
    cardTitle: {
        color: colors.textPrimary, // ✅
        fontSize: 14,
        fontWeight: "600",
        marginTop: 6,
    },
    cardSubtitle: {
        color: colors.textSecondary, // ✅
        fontSize: 12,
        marginTop: 2,
    },
    scrollContent: {
        padding: 10
    },
    inputGroup: {
        marginBottom: 20,
        borderWidth: 1,
        borderColor: colors.strokeBorder,
        borderRadius: 8,
        padding: 12,
        backgroundColor: colors.backgroundSecondry,
    },
    input: {
        backgroundColor: colors.backgroundSecondry,
        color: colors.textPrimary,
        padding: 10,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: colors.strokeBorder,
        marginBottom: 10,
    },
    toggleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 12,
    },
    root: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    row: {
        flexDirection: 'row', // Arrange buttons in a row
        alignItems: 'center', // Align buttons vertically centered
        padding: 10 // Space between rows
    },
    actionContainer: {
        position: 'absolute',
        bottom: 0,
        width: "100%",
        backgroundColor: colors.backgroundPrimary
    },
    trackingButton: {
        marginHorizontal: 5,
        paddingVertical: 5, // Vertical padding
        paddingHorizontal: 8, // Horizontal padding
        backgroundColor: colors.backgroundPrimary,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: colors.accentPrimary,
        alignItems: 'center',
    },
    loadingContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.8)',
        zIndex: 1000,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#000',
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioCircle: {
        width: 18,
        height: 18,
        borderRadius: 9,
        borderWidth: 2,

        borderColor: colors.strokeBorder,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedCircle: {
        borderColor: colors.accentPrimary,
        backgroundColor: colors.accentPrimary,
    },

});

export default styles;
