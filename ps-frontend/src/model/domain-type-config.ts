
export interface PageConfigContainer {
    government: PageConfig;
    contractor: PageConfig;
}

export class PageConfig {
    components: {id: string, component: string}[];
    endpoints: {id: string, endpoint: string}[];
    
    public getEndpoint(id: string) : string {
        
        const endpoint = this.endpoints.find(e => e.id === id);
        if (endpoint) {
            return endpoint.endpoint;
        }
        throw 'Endpoint not found';
    }

    public getComponent(id: string) : any {
        const endpoint = this.components.find(e => e.id === id);
        if (endpoint) {
            return endpoint.component;
        }
        return undefined;
    }
};
