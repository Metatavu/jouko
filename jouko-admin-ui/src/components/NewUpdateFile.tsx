import * as React from 'react';
import '../App.css';
import { uploadUrl } from '../config';
import axios from 'axios';
import { _ } from '../i18n';

interface NewUploadFileState {
    filename: string;
    version: string;
    file: File | null;
}

interface Props {
  kc?: Keycloak.KeycloakInstance;
}

export class NewUpdateFile
    extends React.Component<Props, NewUploadFileState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            filename: '',
            version: '',
            file: null
        };

        this.handleFilenameChange = this.handleFilenameChange.bind(this);
        this.handleVersionChange = this.handleVersionChange.bind(this);
        this.fileChangedHandler = this.fileChangedHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleFilenameChange(event: React.FormEvent<HTMLInputElement>) {
      this.setState({filename: event.currentTarget.value});
    }

    handleVersionChange(event: React.FormEvent<HTMLInputElement>) {
      this.setState({version: event.currentTarget.value});
    }

    fileChangedHandler(e: React.ChangeEvent<HTMLInputElement>) {
      this.setState({file: e!.currentTarget.files![0]});
    }

    async handleSubmit(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();

      const formData = new FormData();
      formData.append('file', this.state.file!);
      formData.append('filename', this.state.filename);
      formData.append('version', this.state.version);

      const config = {
          headers: {
              'content-type': 'multipart/form-data'
          }
      };
      await axios.post(uploadUrl, formData, config);
      alert(_('alertUpdateCreated'));
    }

    render() {
        return (
          <div>
            <h1>
              {_('newUpdatefile')}
            </h1>

            <form 
              onSubmit={this.handleSubmit}
              className="new-update-form" 
              encType="multipart/form-data"
            >
              <h5>
                {_('filename')}
              </h5>

              <input
                type="text"
                name="filename"
                value={this.state.filename}
                onChange={this.handleFilenameChange}
              />

              <h5>
                {_('version')}
              </h5>

              <input
                type="text"
                name="version"
                value={this.state.version}
                onChange={this.handleVersionChange}
              />

              <h5>
                {_('file')}
              </h5>

              <input
                type="file"
                name="file"
                onChange={this.fileChangedHandler}
              />

              <div className="ActionField">
                  <input type="submit" value={_('newUpdatefile')} />
              </div>
            </form>
          </div>
        );
    }
}