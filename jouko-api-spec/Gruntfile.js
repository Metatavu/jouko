/*global module:false*/

const fs = require('fs');

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  
  const SWAGGER_SRC = "https://oss.sonatype.org/content/repositories/snapshots/io/swagger/swagger-codegen-cli/3.0.0-SNAPSHOT/swagger-codegen-cli-3.0.0-20180112.231857-20.jar";
  
  grunt.registerMultiTask('javascript-package-update', 'Updates package.json -file', function () {
    const packageJson = JSON.parse(fs.readFileSync('javascript-generated/package.json'));
    fs.writeFileSync('javascript-generated/package.json', JSON.stringify(Object.assign(packageJson, this.data.fields), null, 2));
  });

  grunt.initConfig({
    'curl': {
      'swagger-codegen':  {
        src: SWAGGER_SRC,
        dest: 'swagger-codegen-cli.jar'
      }
    },
    'clean': {
      'jaxrs-spec-cruft': [
        'jaxrs-spec-generated/src/main/java/fi/metatavu/metamind/server/RestApplication.java'
      ],
      'jaxrs-spec-sources': ['jaxrs-spec-generated/src'],
      'metaforms': ['metaforms']
    },
    'shell': {
      'jaxrs-spec-generate-initial': {
        command : 'java -jar swagger-codegen-cli.jar generate ' +
          '-i ./swagger.yaml ' +
          '-l jaxrs-spec ' +
          '--api-package fi.metatavu.jouko.server.rest ' +
          '--model-package fi.metatavu.jouko.server.rest.model ' +
          '--group-id fi.metatavu.jouko ' +
          '--artifact-id jouko-api-spec ' +
          '--artifact-version 0.0.1 ' +
          '--template-dir jaxrs-spec-templates ' +
          '--additional-properties dateLibrary=java8,useBeanValidation=true,sourceFolder=src/main/java,interfaceOnly=true ' +
          '-o jaxrs-spec-generated/'
      },
      'jaxrs-spec-generate': {
        command : 'mv jaxrs-spec-generated/pom.xml jaxrs-spec-generated/pom.xml.before && ' +
          'java -jar swagger-codegen-cli.jar generate ' +
          '-i ./swagger.yaml ' +
          '-l jaxrs-spec ' +
          '--api-package fi.metatavu.jouko.server.rest ' +
          '--model-package fi.metatavu.jouko.server.rest.model ' +
          '--group-id fi.metatavu.jouko ' +
          '--artifact-id jouko-api-spec ' +
          '--artifact-version `cat jaxrs-spec-generated/pom.xml.before|grep version -m 1|sed -e \'s/.*<version>//\'|sed -e \'s/<.*//\'` ' +
          '--template-dir jaxrs-spec-templates ' +
          '--additional-properties dateLibrary=java8,useBeanValidation=true,sourceFolder=src/main/java,interfaceOnly=true ' +
          '-o jaxrs-spec-generated/'
      },
      'jaxrs-spec-install': {
        command : 'mvn install',
        options: {
          execOptions: {
            cwd: 'jaxrs-spec-generated'
          }
        }
      },
      'jaxrs-spec-release': {
        command : 'git add src pom.xml swagger.json && git commit -m "Generated source" && git push && mvn -B release:clean release:prepare release:perform',
        options: {
          execOptions: {
            cwd: 'jaxrs-spec-generated'
          }
        }
      },
      'typescript-generate': {
        command : 'java -jar swagger-codegen-cli.jar generate ' +
          '-i ./swagger.yaml ' +
          '-l typescript-fetch ' +
          '-t typescript-template/ ' +
          '-o typescript-generated/ ' +
          '--type-mappings Date=string ' +
          '--additional-properties projectName=jouko-api-ts-client,npmName=jouko-ts-client,npmVersion=' + require('./typescript-generated/package.json').version
      },
      'typescript-bump-version': {
        command: 'npm version patch',
        options: {
          execOptions: {
            cwd: 'typescript-generated'
          }
        }
      },
      'typescript-push': {
        command : 'git add . && git commit -m "Generated javascript source" && git push',
        options: {
          execOptions: {
            cwd: 'typescript-generated'
          }
        }
      },
    },
    'publish': {
      'publish-typescript-client': {
        src: ['typescript-generated']
      }
    }
  });
  
  grunt.registerTask('download-dependencies', 'if-missing:curl:swagger-codegen');
  grunt.registerTask('typescript-gen', [ 'download-dependencies', 'shell:typescript-generate']);
  grunt.registerTask('typescript', ['typescript-gen', 'shell:typescript-bump-version', 'shell:typescript-push', 'publish:publish-typescript-client']);
  grunt.registerTask('jaxrs-gen', [ 'download-dependencies', 'clean:jaxrs-spec-sources', 'shell:jaxrs-spec-generate', 'clean:jaxrs-spec-cruft', 'shell:jaxrs-spec-install' ]);
  grunt.registerTask('jaxrs-spec', [ 'jaxrs-gen', 'shell:jaxrs-spec-release' ]);
  grunt.registerTask('ts-client', ['shell:ts-client-generate']);
  
  grunt.registerTask('default', ['jaxrs-spec' ]);
  
};
