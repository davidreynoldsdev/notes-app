export interface GridModel {
    metadata: GridModelMetadata;
    rows: any[];
}

export interface GridModelMetadata {
    columns: GridModelMetadataColumn[];
}

export interface GridModelMetadataColumn {
    label: string;
    name: string;
}